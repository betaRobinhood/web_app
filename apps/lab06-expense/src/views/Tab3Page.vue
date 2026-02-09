<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>แก้ไขข้อมูล</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Title -->
      <ion-input
        label="ชื่อรายการ"
        v-model="title">
      </ion-input>

      <!-- Amount -->
      <ion-input
        label="จำนวนเงิน"
        type="number"
        v-model="amount">
      </ion-input>

      <!-- Type -->
      <ion-select
        label="ประเภท"
        v-model="type">

        <ion-select-option value="income">
          รายรับ
        </ion-select-option>

        <ion-select-option value="expense">
          รายจ่าย
        </ion-select-option>

      </ion-select>

      <!-- Category -->
      <ion-input
        label="หมวดหมู่"
        v-model="category">
      </ion-input>

      <!-- Note -->
      <ion-textarea
        label="หมายเหตุ"
        v-model="note">
      </ion-textarea>

      <!-- Update -->
      <ion-button expand="block" @click="updateExpense">
        อัปเดตข้อมูล
      </ion-button>

      <!-- Delete -->
      <ion-button
        expand="block"
        color="danger"
        @click="showConfirm = true"
      >
        ลบข้อมูล
      </ion-button>

      <!-- Confirm Alert -->
      <ion-alert
        :is-open="showConfirm"
        header="ยืนยันการลบ"
        message="ต้องการลบข้อมูลนี้ใช่หรือไม่?"
        :buttons="alertButtons"
        @didDismiss="showConfirm = false"
      />

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonInput, IonSelect,
  IonSelectOption, IonTextarea,
  IonButton, IonAlert
} from "@ionic/vue";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

/* Router */
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

/* Form state */
const title = ref("");
const amount = ref(0);
const type = ref("expense");
const category = ref("");
const note = ref("");

/* Confirm state */
const showConfirm = ref(false);

/* Load old data */
onMounted(async () => {

  const snap = await getDoc(doc(db, "expenses", id));
  const data: any = snap.data();

  title.value = data.title;
  amount.value = data.amount;
  type.value = data.type;
  category.value = data.category;
  note.value = data.note;

});

/* Update */
const updateExpense = async () => {

  await updateDoc(doc(db, "expenses", id), {
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    note: note.value
  });

  router.push("/tabs/tab1");
};

/* Delete */
const deleteExpense = async () => {

  await deleteDoc(doc(db, "expenses", id));
  router.push("/tabs/tab1");

};

/* Alert buttons */
const alertButtons = [
  {
    text: "ยกเลิก",
    role: "cancel"
  },
  {
    text: "ลบ",
    role: "destructive",
    handler: deleteExpense
  }
];
</script>
