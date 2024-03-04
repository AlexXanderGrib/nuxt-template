<template>
  <div class="container mx-auto max-w-xl p-2">
    <UCard>
      <template #header>
        <UForm :state="searchState" class="flex gap-2">
          <UFormGroup name="search" label="Поиск" class="w-full">
            <UInput
              v-model="searchState.search"
              type="search"
              autocomplete="off"
              aria-autocomplete="none"
            />
          </UFormGroup>
          <div class="pt-6">
            <UButton icon="i-heroicons-plus" @click="openAdd">Добавить</UButton>
          </div>
        </UForm>
      </template>

      <ul class="flex flex-col gap-4">
        <li v-for="todo in todos" :key="todo.id">
          <UAlert
            :title="todo.title"
            :actions="[
              todo.completed
                ? {
                    icon: 'i-heroicons-x-circle',
                    label: 'Отменить',
                    color: 'blue',
                    variant: 'outline',
                    click: () => cancel(todo.id)
                  }
                : {
                    icon: 'i-heroicons-check-circle',
                    label: 'Выполнить',
                    color: 'green',
                    variant: 'outline',
                    click: () => complete(todo.id)
                  },
              {
                icon: 'i-heroicons-trash',
                label: 'Удалить',
                color: 'red',
                variant: 'outline',
                click: () => remove(todo.id)
              }
            ]"
          >
            <template #title="{ title }">
              <span :class="{ 'line-through': todo.completed }">
                {{ title }}
              </span>
            </template>
          </UAlert>
        </li>
      </ul>
    </UCard>

    <UModal v-model="addState.open">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Добавить</h2>
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              @click="addState.open = false"
            ></UButton>
          </div>
        </template>

        <UForm :state="addState" class="flex flex-col gap-2" @submit="add">
          <UFormGroup name="title" label="Название">
            <UInput v-model="addState.title" type="text" />
          </UFormGroup>

          <div class="flex justify-end gap-2">
            <UButton color="gray" @click="addState.open = false">
              Закрыть
            </UButton>
            <UButton color="primary" type="submit">Сохранить</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "TODO List"
});

const searchState = reactive({
  search: ""
});

const addState = reactive({
  open: false,
  title: ""
});

const { $trpc } = useNuxtApp();

const searchRef = computed(() => ({ ...searchState }));
const { data: todos, refresh } = $trpc.list.useQuery(searchRef);

async function complete(id: string) {
  await $trpc.setCompleted.mutate({ id });
  await refresh();
}

async function cancel(id: string) {
  await $trpc.setNotCompleted.mutate({ id });
  await refresh();
}

async function remove(id: string) {
  await $trpc.remove.mutate({ id });
  await refresh();
}

function openAdd() {
  addState.open = true;
}

async function add() {
  await $trpc.add.mutate({ title: addState.title });
  addState.open = false;
  addState.title = "";
  await refresh();
}
</script>
