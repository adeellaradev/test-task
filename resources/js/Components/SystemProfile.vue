<script setup>
   import { ref, onMounted } from 'vue';
   import axios from 'axios';

   const userProfile = ref(null);
   const errorMessage = ref(null); 
   const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/get-profile');  
            userProfile.value = response.data;  
        } catch (error) { 
            errorMessage.value = 'Failed to fetch user profile. Please try again later.';
        }
    };

    onMounted(() => {
        fetchUserProfile();
    });
    
     

</script>

<template>
     

    <h2 class="font-semibold text-xl text-gray-800 leading-tight">  System Profile </h2>
    <hr>
    <br>
    <div v-if="userProfile">
        <p><strong>Name:</strong> {{ userProfile.name }}</p>
        <p><strong>Email:</strong> {{ userProfile.email }}</p>
        <p><strong>Member Since:</strong> {{ new Date(userProfile.created_at).toLocaleDateString() }}</p>
    </div> 
    <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
    </div>
    <div v-else-if="!userProfile && !errorMessage">
        <p>Loading profile...</p>
    </div>



</template>
