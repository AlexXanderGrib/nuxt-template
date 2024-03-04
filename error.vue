<script setup lang="ts">
  const error = useError();

  const exit = "/";
  const handleError = () => clearError({ redirect: exit });
</script>

<template>
  <div
    v-if="error"
    class="flex flex-col px-8 justify-center items-center gap-2 min-h-[400px]"
  >
    <h1 class="text-4xl md:text-6xl">
      Error
      <span v-if="'statusCode' in error" class="text-primary-500 font-bold">{{
        error.statusCode
      }}</span>
    </h1>
    <p class="opacity-70">{{ error.message }}</p>
    <UButton variant="outline" size="xl" @click="handleError">
      Go back home
    </UButton>
  </div>
</template>
