<script setup>
import { ref } from 'vue';

defineProps(['data']);
const emit = defineEmits(['getFileData','updateData','changeTaskState'])
const isEdit = ref(false);
const existFile = ref(null);

const fileData = ref({});
const toggleEdit = ()=>{ isEdit.value=!isEdit.value }
const getFileData = (id)=>{
  fileData.id = id;
  fileData.fileName = existFile.value.files[0].name
  const newDate = new Date();
  fileData.fileDate = `${newDate.getFullYear()}年${newDate.getMonth()}月${newDate.getDay()}日`

  emit('getFileData',fileData)
}

// function getFileData(id){
//   fileData.id = id;
//   fileData.fileName = existFile.value.files[0].name
//   const newDate = new Date();
//   fileData.fileDate = `${newDate.getFullYear()}年${newDate.getMonth()}月${newDate.getDay()}日`

//   emit('getFileData',fileData)
// }

</script>
<template>
  <form @submit.prevent="$emit('updateData')" class="task" :class="{importantTask:data.isPriority,finishTask:data.isFinish}">
    <div class="task_item_state">
      <div class="task_information" :class="{toggleImportantColor:data.isPriority}"> 
        <div class="task_event">
          <input class="finish_task" type="checkbox" @click="$emit('changeTaskState','isFinish',data.id)" v-model="data.isFinish">
          <input class="task_title" type="text" size="30" placeholder="Type Something Here..." v-model="data.title" :readonly="!isEdit||data.isFinish">
        </div>
        <div class="task_mark">
          <button class="task_important" type="button" @click="$emit('changeTaskState','isPriority',data.id)"><i :class="[data.isPriority?'fa-solid':'fa-regular','fa-star']"></i></button>
          <button class="task_edit_button" type="button" @click="toggleEdit"><i :class="[isEdit?'fa-solid fa-pen':'bi bi-pencil']"></i></button>
        </div>
      </div>
      <div class="task_state_information" :class="{toggleImportantColor:data.isPriority}">
        <div class="date_icon" v-show='data.date'>
          <time class="time">{{ data.date.slice(5,7) }}/{{ data.date.slice(8)}}</time>
        </div>
        <div class="file_icon" v-show='data.fileName'></div>
        <div class="comment_icon" v-show='data.comment'></div>
      </div>
    </div>
    <div class="task_edit" v-show="isEdit">
      <div class="edit_input">
        <div class="deadline">
          <label for="deadline" class="deadline_text">deadline</label>
          <div class="deadline_button">
            <input type="date" name="deadline" id="deadline" class="deadline_button_date" v-model="data.date" :readonly="data.isFinish">
            <input type="time" class="deadline_button_time" v-model="data.time" :readonly="data.isFinish">
          </div>
        </div>
        <div class="file_container">
          <label :for="data.id" class="file_text">file
            <input type="file" name="file" class="changeFile" ref="existFile" :id="data.id" @change="getFileData(data.id)" :readonly="data.isFinish">
            <div class="file_button">
              <div class="file_data" v-show="data.fileName">
                <span class="file_name">{{ data.fileName }}</span>
                <span class="file_date">{{ data.fileDate }}</span>
                </div>
              <div class="file_button_icon"><i class="fas fa-plus"></i></div>
            </div>
          </label>
        </div>
        <div class="comment">
          <label for="comment" class="comment_title">comment</label>
          <textarea name="comment" class="comment_text" rows="5" placeholder="Type your memo here..." id="comment" v-model="data.comment" :readonly="data.isFinish"></textarea>
        </div>
      </div>
      <div class="check">
        <button class="cancel_button" @click="toggleEdit" type="reset">cancel</button>
        <button class="confirm_button" @click="toggleEdit" type="submit">add task</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/style/components/_button.scss";
@import "@/assets/style/components/_edit.scss";
@import "@/assets/style/components/_icon.scss";
@import "@/assets/style/components/_task.scss";

</style>