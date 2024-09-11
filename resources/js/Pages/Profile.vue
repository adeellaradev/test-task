<script setup>
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
    import SystemProfile from './../Components/SystemProfile.vue';
    import CronofyProfile from './../Components/CronofyProfile.vue';
    import { Head } from '@inertiajs/vue3';

    defineProps({
        
        
    });
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <SystemProfile   class="max-w-xl"/>
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <CronofyProfile  class="max-w-xl"/>
                </div> 
            </div>
        </div>
    </AuthenticatedLayout>
</template>
