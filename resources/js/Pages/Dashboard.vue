<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import DangerButton from '@/Components/DangerButton.vue';
import GetEvents from '../Components/GetUserEvents.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
   const userProfile = ref(null);
   const errorMessage = ref(null); 
   const authToCronofy = () => {
            // Redirect to the Cronofy authentication route
            Inertia.visit(route('cronofy.auth')); // Use Inertia's visit method for client-side navigation
    };

</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2> 
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6  ">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">   
                        <div class="p-6 text-gray-900 d-flex" v-if="!$page.props.auth.user.cronofy_access_token">  
                            <DangerButton @click="authToCronofy">Please Setup Your Cronofy Account </DangerButton>
                        </div>  
                </div> 
                <GetEvents v-if="$page.props.auth.user.cronofy_access_token"/> 
            </div> 

        </div> 
        
    </AuthenticatedLayout>
</template>
