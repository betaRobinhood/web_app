<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการรายรับรายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-list>

        <ion-item
          v-for="item in expenses"
          :key="item.id"
          button
          @click="goEdit(item.id)"
        >
          <ion-label>

            <h2>{{ item.title }}</h2>

            <p>
              {{ item.type }}
              • {{ item.amount }}
            </p>

          </ion-label>
        </ion-item>

      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

import { useRouter } from "vue-router";
const router = useRouter();

const goEdit = (id: string) => {
  router.push(`/tabs/edit/${id}`);
};

/* State */
const expenses = ref<any[]>([]);

/* Realtime read */
onMounted(() => {

  onSnapshot(
    collection(db, "expenses"),
    (snapshot) => {

      expenses.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    }
  );

});
</script>
