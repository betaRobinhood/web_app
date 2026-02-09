<template>
  <ion-page>

    <!-- Header -->
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการรายรับรายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Summary -->
      <div style="margin-bottom: 20px">
        <h3>รวมรายรับ: {{ incomeTotal }}</h3>
        <h3>รวมรายจ่าย: {{ expenseTotal }}</h3>
      </div>

      <!-- List -->
      <ion-list>

        <ion-item
          v-for="item in expenses"
          :key="item.id"
        >
          <ion-label>

            <h2>{{ item.title }}</h2>

            <p>
              ประเภท: {{ item.type }}
              <br>
              จำนวนเงิน: {{ item.amount }}
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

import { ref, onMounted, computed } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

/* State */
const expenses = ref<any[]>([]);

/* Realtime Read */
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

/* Summary Calculation */
const incomeTotal = computed(() =>
  expenses.value
    .filter(e => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0)
);

const expenseTotal = computed(() =>
  expenses.value
    .filter(e => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0)
);
</script>
