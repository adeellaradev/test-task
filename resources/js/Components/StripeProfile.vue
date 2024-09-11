<script setup>
   import { ref, onMounted } from 'vue';
   import axios from 'axios';
   import StripeInvoices from '@/Components/Stripeinvoices.vue';
   const profile = ref(null);
   const errorMessage = ref(null); 
   const showInvoices = ref(false);
    
   const fetchUserStripeProfile = async () => {
       try {
           const response = await axios.get('/stripe/profile');  // Adjust route as needed
           if (response.data.success) {
               profile.value = response.data.profile; 
           } else {
               errorMessage.value = response.data.error || 'Failed to fetch profile details.';
           }
       } catch (error) { 
           errorMessage.value = 'Failed to fetch user Stripe profile. Please try again later.';
       }
   };

   

    onMounted(() => {
        fetchUserStripeProfile();
    });

    
    
     

</script>

<template>  

    <div class="flex justify-between items-center mb-4">
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {{ $page.props.auth.user.name }}'s Stripe Profile
        </h2>
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl dark:text-white">
            <button @click="showInvoices  = !showInvoices" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                       View Invoices
                </span>
            </button>
        </h2>
    </div>


    <div v-if="profile" class="  justify-between items-right mb-4"> 
        <ul class="text-left"> 
            <li>
                <strong>Name:</strong> {{ profile.name }}
            </li>
            <li>
                <strong>Email:</strong> {{ profile.email }}
            </li>
            <li>
                <strong>Invoice Prefix:</strong> {{ profile.invoice_prefix }}
            </li>
            <li>
                <strong>Address:</strong> {{ profile.address }}
            </li>
            <li>
                <strong>Current Balance:</strong> {{ profile.balance }}
            </li>
            <li>
                <strong>Created:</strong> {{ new Date(profile.created * 1000).toLocaleString() }}
            </li> 
        </ul>
        
    </div> 
    <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
    </div>
    <div v-else-if="!profile && !errorMessage"> 
        <div   class="flex justify-center my-4">
            <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8v2a10 10 0 100-20v2a8 8 0 010 16z"></path>
            </svg>
           &nbsp;&nbsp;  <strong> Loading Profile .. </strong>  
        </div>

    </div>

    <div class="mb-3 bg-white overflow-hidden shadow-sm sm:rounded-lg" v-if="$page.props.auth.user.stripe_customer_id && showInvoices ">    
        <div class="text-center  p-6 text-gray-900 d-flex">  
            <StripeInvoices > </StripeInvoices>
        </div> 
    </div>  



</template>
