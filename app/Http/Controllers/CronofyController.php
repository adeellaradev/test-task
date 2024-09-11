<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CronofyController extends Controller
{
    private $clientId;
    private $clientSecret;


   
    public function __construct()
    {
        $this->clientId = env('CRONOFY_CLIENT_ID');
        $this->clientSecret = env('CRONOFY_CLIENT_SECRET');
    }


    public function dashboard(){ 
        return Inertia::render('Dashboard');
    }   
    public function getEvents(){
        $user = Auth::user();
        $accessToken = $user->cronofy_access_token;  
        $calendarsResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get('https://api.cronofy.com/v1/calendars'); 
        if ($calendarsResponse->successful()) {
            $calendars = $calendarsResponse->json();
            $calendarId = $calendars['calendars'][0]['calendar_id'];  
        } else {
            return response()->json(['error' => 'Failed to retrieve calendars'], 500);
        } 
        $eventsResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get("https://api.cronofy.com/v1/events", [
            'calendar_ids[]' => $calendarId,  
            'from' => now()->startOfDay()->toDateString(), 
            'to' => now()->addMonth()->endOfDay()->toDateString(),  
            'tzid' => 'UTC',  
        ]);
        $events = $eventsResponse->json();
        if ($eventsResponse->successful()) {
            $events = $eventsResponse->json();    
            return response()->json([
            'calendars' => $calendars,
            'events' => $events['events'] 
        ]);  
        } else {
            return response()->json(['error' => 'Failed to retrieve events'], 500);
        }  
    }  


    public function myProfile(){
        
        return Inertia::render('Profile');
    }

    public function getProfile()
    {
        $user = Auth::user();
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'created_at' => $user->created_at, 
        ]);
    }

    public function getCronofyProfile()
    {
        $user = Auth::user();
        $accessToken = $user->cronofy_access_token;  
        $profileResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get('https://api.cronofy.com/v1/account'); 
        if ($profileResponse->successful()) {
            $profile = $profileResponse->json();  
            return response()->json([
                'profile' => $profile['account'], 
            ]);
        } else {
            return response()->json(['error' => 'Failed to retrieve profile information'], 500);
        }
        
    }



    public function showCalendars()
    {

        

        $user = Auth::user();
        $accessToken = $user->cronofy_access_token;  
        $profileResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get('https://api.cronofy.com/v1/account');

        if ($profileResponse->successful()) {
            $profile = $profileResponse->json();
        } else {
            return response()->json(['error' => 'Failed to retrieve profile information'], 500);
        }
    
        
        // Step 2: Get the user's calendars
        $calendarsResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get('https://api.cronofy.com/v1/calendars');
     
        if ($calendarsResponse->successful()) {
            $calendars = $calendarsResponse->json();
            $calendarId = $calendars['calendars'][0]['calendar_id']; // Get the first calendar's ID (Google Calendar)
        } else {
            return response()->json(['error' => 'Failed to retrieve calendars'], 500);
        }
        
        // Step 3: Get the events from the specific calendar
        $eventsResponse = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
            'Content-Type' => 'application/json',
        ])->get("https://api.cronofy.com/v1/events", [
            'calendar_ids[]' => $calendarId, // Fetch events from this calendar
            'from' => now()->startOfDay()->toDateString(), // Events from today onwards
            'to' => now()->addMonth()->endOfDay()->toDateString(), // Adjust as needed
            'tzid' => 'UTC', // Use 'UTC' or replace with the desired timezone like 'America/New_York'
        ]);
        $events = $eventsResponse->json(); 
        
        if ($eventsResponse->successful()) {
            $events = $eventsResponse->json(); 
            return view('calendars', [ 
                    'profile' => $profile['account'],
                    'calendars' => $calendars,
                    'events' => $events 
            ]);

        } else {
            return response()->json(['error' => 'Failed to retrieve events'], 500);
        }
    }



    public function redirectToCronofy()
    {
        $client_id = env('CRONOFY_CLIENT_ID');
        $redirect_uri = route('cronofy.callback');
        $scope = 'read_events'; 
        $authorizationUrl = "https://app.cronofy.com/oauth/authorize?response_type=code&client_id=$client_id&redirect_uri=$redirect_uri&scope=$scope"; 
        return redirect($authorizationUrl);
    }


    public function handleCronofyCallback(Request $request)
    {
        $authorizationCode = $request->query('code');  
        $response = Http::asForm()->post('https://api.cronofy.com/oauth/token', [
            'client_id' => env('CRONOFY_CLIENT_ID'),
            'client_secret' => env('CRONOFY_CLIENT_SECRET'),
            'grant_type' => 'authorization_code',
            'code' => $authorizationCode,
            'redirect_uri' => route('cronofy.callback'),
        ]); 
        if ($response->successful()) {
            $data = $response->json(); 
            $accessToken = $data['access_token'];
            $refreshToken = $data['refresh_token'];  
            $user = Auth::user();
            $user->cronofy_access_token = $accessToken;
            $user->cronofy_refresh_token = $refreshToken;
            $user->save();  
            return redirect()->route('dashboard')->with('success', 'Successfully authenticated with Cronofy.');
        } else {
            return response()->json(['error' => 'Failed to authenticate with Cronofy'], 500);
        }
    }






}
