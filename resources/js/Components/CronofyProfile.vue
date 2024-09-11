<script setup>
   import { ref, onMounted } from 'vue';
   import axios from 'axios';

   const profile = ref(null);
   const errorMessage = ref(null); 
   const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/get-cronofy-profile');  
            profile.value = response.data.profile; 
        } catch (error) { 
            errorMessage.value = 'Failed to fetch user profile. Please try again later.';
        }
    };

    onMounted(() => {
        fetchUserProfile();
    });
    
     

</script>

<template> 
    

    <div class="flex justify-between items-center mb-4">
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Cronofy Profile
        </h2>
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl dark:text-white">
            <a href="dashboard" > Event Details </a>
        </h2>
    </div>


     
    <br>
    <div v-if="profile"> 
        <p><strong>Name:</strong> {{ profile.name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Time Zone:</strong> {{ profile.default_tzid }}</p>
    </div> 
    <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
    </div>
    <div v-else-if="!profile && !errorMessage">
        <p>Loading profile...</p>
    </div>



</template>
