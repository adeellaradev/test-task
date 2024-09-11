<script setup>
   import { ref, onMounted } from 'vue';
   import { Inertia } from '@inertiajs/inertia';
   import axios from 'axios'; 
   const plans = ref([]);
   const errorMessage = ref(null);
   const selectedPlan = ref(null);
   const successMessage = ref(null);
   const isLoading = ref(false);

 
    const fetchPlans = async () => {
       try {
           const response = await axios.get('/fetch/plans');  // Adjust route as needed
           if (response.data.success) {
               plans.value = response.data.plans; 
           } else {
               errorMessage.value = response.data.error || 'Failed to fetch plans.';
           }
       } catch (error) { 
           errorMessage.value = 'Failed to fetch plans. Please try again later.';
       }
   };
   const redirectToPayment = (planId) => {
    Inertia.visit('/payment', {
        method: 'get',
        data: { planId },  // Send planId as query parameter
    });
};

 
    onMounted(() => {
        fetchPlans();
    });
  
     

</script>

<template>  

    <div class="flex justify-between items-center mb-4">
         

        <div class=" " v-if="plans.length">
             
            <div v-if="plans.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="plan in plans" :key="plan.id" class="border p-4 rounded-lg">
                    <h3 class="text-lg font-semibold">{{ plan.nickname }}</h3>
                    <p>Price: {{ (plan.amount / 100).toFixed(2) }} {{ plan.currency.toUpperCase() }}</p>
                    <p>Billing Interval: {{ plan.interval }}</p>
                    <button @click="redirectToPayment(plan.id)"  class="mt-2 bg-blue-500 text-white px-4 py-2 rounded" :disabled="isLoading">
                        Subscribe
                    </button>
                </div>
            </div>
             
            
        </div>

        
        
    </div>

 



</template>
