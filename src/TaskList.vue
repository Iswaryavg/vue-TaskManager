<template>
  <div class="right">
  <section class="right__title">
  <button class="btn btn-primary" type="button"  @click="emit('add')" open="true">
  <i class="bi bi-plus"></i>Add Task</button>
  </section>
  <hr>
  <section class="d-grid gap-2 d-md-block d-lg-flex">
    <button class="btn btn-outline-dark"  v-for="data in buttondata" :key="data" @click="emit('filtereddata',data)">{{ data }}</button>
  </section>

  <section>

    <br/>
    <TaskCard v-for="task in tasks" :key="task.id" :task="task"  @edit="emit('edit',$event)" @delete="emit('delete',$event)"/>
<br>


  </section>

</div>
</template>
<script setup>

import TaskCard from './TaskCard.vue';
import { reactive } from 'vue';
const {tasks} = defineProps({tasks:{type:Array,required:true}})
const emit = defineEmits(['add','edit', 'delete','filtereddata'])
const buttondata=reactive(['All','To do','In progress','Done']);

</script>
