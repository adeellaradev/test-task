<script setup>
   import { ref, onMounted } from 'vue';
   import axios from 'axios';

    const invoices = ref([]);
    const errorMessage = ref(null);
    const isLoading = ref(true);
    const fetchInvoices = async () => {
        try {
            const response = await axios.get('/stripe/invoices');  // Adjust route as needed
            if (response.data.success) {
                if (response.data.invoices.length > 0) {
                    invoices.value = response.data.invoices;
                } else {
                    errorMessage.value = 'No invoices found.';
                }
            } else {
                errorMessage.value = response.data.error || 'Failed to fetch invoices.';
            }
        } catch (error) {
            errorMessage.value = 'Failed to fetch invoices. Please try again later.';
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        fetchInvoices();
    });
    
     

</script>

<template> 
    

    <div class="flex justify-between items-center mb-4 mt-3">
        <h2 class="text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Invoices
        </h2> 
    </div> 
    <div v-if="invoices.length > 0" class="justify-between items-right mb-4"> 
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Invoice ID #
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Amount 
                    </th> 
                    <th scope="col" class="px-6 py-3">
                        Billing Reason
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Hosted URL
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Created
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="invoice in invoices" :key="invoice.id">
                    <td scope="col" class="px-6 py-3">
                        {{ invoice.id }}
                    </td>
                    <td scope="col" class="px-6 py-3">
                        $ {{ invoice.amount_due / 100 | currency }} - 
                    </td>
                    <td scope="col" class="px-6 py-3">
                        {{ invoice.billing_reason }}
                    </td>
                    <td scope="col" class="px-6 py-3">
                        {{ invoice.status }}
                    </td>
                    <td scope="col" class="px-6 py-3"> 
                        <a :href="invoice.hosted_invoice_url" target="_blank"> View Invoice </a> 
                    </td> 
                    <td class="px-6 py-4">{{ new Date(invoice.created).toLocaleString() }}</td>
                     
                </tr>
            </tbody>
        </table> 
    </div> 
    <div v-else-if="!isLoading && !errorMessage && invoices.length === 0" class="text-gray-500">
        <p>No invoices found.</p>
    </div>

    <div v-if="errorMessage" class="text-red-500">
        {{ errorMessage }}
    </div>
    <div v-if="isLoading"> 
        <div   class="flex justify-center my-4">
            <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8v2a10 10 0 100-20v2a8 8 0 010 16z"></path>
            </svg>
           &nbsp;&nbsp;  <strong> Loading Invoices. .. </strong>  
        </div> 
    </div>
     



</template>
