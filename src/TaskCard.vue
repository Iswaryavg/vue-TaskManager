<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
function displayColor(status)
{
  if(status==='In progress')
{
  return 'status-progress'
}
 if(status==='Done')
{
  return 'status-done'
}
 if(status==='To do')
{
  return 'status-todo'
}

}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>{{ props.task.tasktitle }}</h3>
      <button :class="displayColor(props.task.status)">
        {{ props.task.status }}
      </button>
    </div>

    <div class="card-body">
      <p>{{ props.task.taskcontent }}</p>
      <p>{{ props.task.deadline }}</p>

      <button class="btn btn-primary" @click="emit('edit', task)">Edit</button>&nbsp;
      <button class="btn btn-danger" @click="emit('delete', task)">Delete</button>
    </div>
  </div>

  <br>
</template>


<style scoped>
  .status-progress {
  background-color: yellow;
  border:none;
  color:black;
}
  .status-done {
  background-color: green;
  border:none;
  color:white;
}
 .status-todo {
  background-color: #0D6EFD;
  border:none;
  color:white;
}
</style>
