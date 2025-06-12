
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Fetch weather data from OpenWeatherMap API
    const weatherApiKey = Deno.env.get('OPENWEATHER_API_KEY')
    if (!weatherApiKey) {
      throw new Error('OpenWeather API key not configured')
    }

    const city = 'Montreal'
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`
    )

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.statusText}`)
    }

    const weatherData = await weatherResponse.json()
    
    // Extract relevant weather information
    const today = new Date().toISOString().split('T')[0]
    const precipitation = weatherData.rain?.['1h'] || weatherData.snow?.['1h'] || 0
    
    const weatherRecord = {
      city,
      date: today,
      temperature: weatherData.main.temp,
      precipitation: precipitation,
      weather_condition: weatherData.weather[0].main,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed
    }

    // Insert or update weather data
    const { error: weatherError } = await supabaseClient
      .from('weather_data')
      .upsert(weatherRecord, { 
        onConflict: 'city,date',
        ignoreDuplicates: false 
      })

    if (weatherError) {
      throw weatherError
    }

    // Calculate daily booking stats (simulated for now - in production, this would query actual bookings)
    const baseBookings = Math.floor(Math.random() * 10) + 5 // 5-15 base bookings
    const weatherMultiplier = precipitation > 2 ? 1.5 : precipitation > 0 ? 1.2 : 1.0
    const bookingCount = Math.floor(baseBookings * weatherMultiplier)
    
    const demandRecord = {
      city,
      date: today,
      booking_count: bookingCount,
      total_bookings_value: bookingCount * (Math.random() * 50 + 75), // $75-125 per booking
      weather_correlation_score: weatherMultiplier
    }

    // Insert or update demand stats
    const { error: demandError } = await supabaseClient
      .from('daily_demand_stats')
      .upsert(demandRecord, { 
        onConflict: 'city,date',
        ignoreDuplicates: false 
      })

    if (demandError) {
      throw demandError
    }

    console.log(`Weather data collected for ${city} on ${today}`)
    console.log(`Temperature: ${weatherRecord.temperature}°C, Precipitation: ${precipitation}mm`)
    console.log(`Booking demand: ${bookingCount} bookings`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        weather: weatherRecord,
        demand: demandRecord
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in weather-data-collector:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
