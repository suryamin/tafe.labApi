// 1. Reference the Deno types to help VS Code understand 'Deno' and 'Request'
/// <reference types="https://raw.githubusercontent.com/supabase/edge-runtime/main/lib/edge-runtime.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// 2. Setup CORS so your React Native app is allowed to call this function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle the browser/mobile 'preflight' request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const city = url.searchParams.get("city");

    // This pulls the key you saved in Step 2 securely from the server
    const apiKey = Deno.env.get("WEATHER_API_KEY");

    if (!city) {
      return new Response(JSON.stringify({ error: "City name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Fetch data from OpenWeather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    // 4. Return the data to your React Native app
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
