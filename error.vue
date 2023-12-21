<script setup lang="ts">
  const error = useError();

  const exit = "/";
  const handleError = () => clearError({ redirect: exit });
</script>

<template>
  <div
    class="flex flex-col px-8 justify-center items-center gap-2 min-h-[400px]"
    v-if="error"
  >
    <h1 class="text-4xl md:text-6xl">
      Error
      <span v-if="'statusCode' in error" class="text-primary-500 font-bold">{{
        error.statusCode
      }}</span>
    </h1>
    <p class="opacity-70">{{ error.message }}</p>
    <UButton @click="handleError" variant="outline" size="xl">
      Go back home
    </UButton>
  </div>
</template>
