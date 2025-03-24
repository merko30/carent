<template>
  <container>
    <div v-if="vehicle">
      <div class="w-full border-2 border-gray-100 mb-4">
        <img
          :src="vehicle.images?.[0]?.url"
          :alt="`${vehicle.brand.name} ${vehicle.model}`"
          class="w-full h-96 object-cover rounded-lg mb-4"
        />
      </div>
      <div class="flex gap-4">
        <div class="w-2/3">
          <h1 class="text-4xl font-semibold mb-4">
            {{ vehicle?.brand.name }}{{ vehicle?.model }}
          </h1>
          <div class="flex items-center gap-4 pb-4">
            <FeatureItem
              label="Tip goriva"
              :value="FUEL_TYPE_TRANSLATIONS[vehicle.typeOfFuel as keyof typeof FUEL_TYPE_TRANSLATIONS]"
            >
              <Fuel />
            </FeatureItem>
            <FeatureItem :value="vehicle.numberOfSeats" label="Broj sjedišta">
              <Armchair />
            </FeatureItem>
          </div>
          <div class="flex gap-6 items-center py-8 border-y border-gray-300">
            <div class="flex gap-3">
              <p class="text-lg uppercase transform rotate-90 -ml-8">VLASNIK</p>
              <img
                :src="vehicle.owner.avatar || undefined"
                :width="64"
                :height="64"
                :alt="vehicle.owner.username"
                class="w-16 h-16 rounded-full"
              />
            </div>
            <div>
              <h1 class="text-lg font-medium">{{ vehicle.owner.username }}</h1>
              <p>
                <span>4 vozila</span>
                <span class="text-gray-500"> | </span>
                <span class="inline-flex items-center gap-2"
                  >4.5
                  <Star
                    class="inline size-4 fill-orange-300 stroke-orange-300"
                  />
                </span>
              </p>
            </div>
          </div>
          <!-- <div>
            <h2 class="text-xl font-semibold mb-4">Opis</h2>
            <p>{{ vehicle.description }}</p>
            </div> -->
        </div>
        <div class="w-1/3">
          <div class="p-4">
            <h2 class="text-2xl font-semibold leading-snug">
              <span class="text-orange-400 font-semibold">{{ total }}KM</span>
              ukupno
            </h2>
            <p class="text-gray-400 text-sm mb-4">
              {{ vehicle.price }} KM po danu
            </p>
            <hr class="text-gray-300 my-5" />
            <VueDatePicker
              v-model="startDate"
              format="dd.MM., HH:mm"
              :ui="{
                input: 'border-0 py-4 outline-none bg-red-500',
              }"
              :time-picket="true"
              :min-date="new Date()"
              class="mb-5"
              :calendar-props="{ show: true }"
            />
            <VueDatePicker
              v-model="endDate"
              format="dd.MM., HH:mm"
              :ui="{
                input: 'border-none py-4 outline-none bg-red-500',
              }"
              :time-picket="true"
              :calendar-props="{ show: true }"
            />
          </div>
        </div>
      </div>
    </div>
  </container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Fuel, Armchair, Star } from "lucide-vue-next";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import Container from "@/components/container.vue";

import { FUEL_TYPE_TRANSLATIONS } from "@/constants/features";

import type { Vehicle } from "@/types";

const route = useRoute();

const startDate = ref<Date>(new Date(new Date().setHours(10, 0)));
const endDate = ref<Date>(
  new Date(new Date().setHours(10, 0, 0, 0) + 1000 * 60 * 60 * 24)
);
const total = computed(() => {
  if (!vehicle.value) return 0;
  const diff = endDate.value.getTime() - startDate.value.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) * vehicle.value.price;
});

effect(() => {
  if (startDate.value > endDate.value) {
    endDate.value = new Date(startDate.value.getTime() + 1000 * 60 * 60 * 24);
  }
});

const { data, error } = await useFetch<Vehicle>(
  `/api/vehicles/${route?.params?.id}`,
  {}
);

if (error.value?.statusCode === 404) {
  throw showError({
    statusCode: 404,
    statusMessage: "Vozilo koje tražite ne postoji.",
  });
}

const vehicle = computed(() => data?.value);
</script>
