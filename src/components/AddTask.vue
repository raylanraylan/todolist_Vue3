<script setup>
import { ref,reactive } from 'vue';
import { dataStone } from '@/stores/data';

let data = dataStone();
// let dataArray = ref(JSON.parse(localStorage.getItem("item")) || [])

const taskOpen = ref(false)
const addButtonState = ref(true)
const dataState = ref(false);

const toggle = ()=>{
  taskOpen.value = !taskOpen.value
  addButtonState.value = !addButtonState.value
}

const file = ref(null);
function uploadFile(){
  showFileDate();
  taskData.fileName = file.value.files[0].name
  const newDate = new Date();
  taskData.fileDate = `${newDate.getFullYear()}年${newDate.getMonth()}月${newDate.getDay()}日`
}

function showFileDate(){
  dataState.value = true;
}

function closeFileDate(){
  dataState.value = false;
}

let finish = ref(false);
function isFinish(){
  finish.value = !finish.value
}

let priority = ref(false);
function isPriority(){
  priority.value = !priority.value
}

let taskData = reactive({
  isPriority:'',
  isFinish: '',
  title:'',
  date:'',
  time:'',
  fileName:'',
  fileDate:'',
  comment:'',
})

function clearInputs() {
  for (let key in taskData) {
    taskData[key] = '';
  }
  priority.value= false;
  finish.value= false;
}

const taskId = ref(0);
function saveData(){
  //如果dataArray是undefined，就重新給值
  // if (!data.dataArray) {
  //   taskId.value = 0
  // }
  //資料需要完全獨立
  taskData.isPriority = priority.value;
  taskData.isFinish = finish.value;

  taskId.value = data.dataArray.length
  data.dataArray.push({id:taskId.value++,...taskData});
  // data.saveItem();
  localStorage.setItem("item", JSON.stringify(data.dataArray));


  // console.log('saveNewData');
  //可以存值但不能跨元件更新畫面
  // dataArray.value.push({id:taskId.value++,...taskData});
  // localStorage.setItem("item", JSON.stringify(dataArray.value));

  //清除畫面資料
  clearInputs();
  closeFileDate();
}

</script>

<template>
  <button class="add_task_button" @click="toggle" v-show="addButtonState">add task</button>
  <form class="add_task_item" @submit.prevent="saveData" ref="task" v-show="taskOpen">
    <div class="task_information" :class="{toggleImportantColor:priority}"> 
      <div class="task_event">
        <input class="finish_task" type="checkbox" v-model="finish" @click="isFinish">
        <input v-model="taskData.title" class="task_title" type="text" size="28" placeholder="Type Something Here...">
      </div>
      <div class="task_mark">
        <button class="task_important" type="button" @click="isPriority">
          <i :class="[priority?'fa-solid':'fa-regular','fa-star']"></i>
        </button>
        <button class="task_edit_button" type="button" @click="toggle">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
    </div>
    <div class="task_edit">
      <div class="edit_input">
        <div class="deadline">
          <label for="deadline" class="deadline_text">deadline</label>
          <div class="deadline_button">
            <input type="date" name="deadline" id="deadline" class="deadline_button_date" v-model="taskData.date">
            <input type="time" class="deadline_button_time" v-model="taskData.time">
          </div>
        </div>
        <div class="file_container">
          <label for="file" class="file_text">file
            <input type="file" name="file" id="file" class="uploadFile" @change="uploadFile" ref="file">
            <div class="file_button">
              <div class="file_data" v-show="dataState">
                <span class="file_name">{{ taskData.fileName }}</span>
                <span class="file_date">{{ taskData.fileDate }}</span>
              </div>
              <div class="file_button_icon"><i class="fas fa-plus"></i></div>
            </div>
          </label>
        </div>
        <div class="comment">
          <label for="comment" class="comment_title">comment</label>
          <textarea name="comment" class="comment_text" rows="5" placeholder="Type your memo here..." id="comment" v-model="taskData.comment"></textarea>
        </div>
      </div>
      <div class="check">
        <button @click="toggle" class="cancel_button" type="reset">cancel</button>
        <button @click="toggle" class="confirm_button">add task</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/style/components/_button.scss";
@import "@/assets/style/components/_edit.scss";
@import "@/assets/style/components/_icon.scss";
@import "@/assets/style/components/_task.scss";

.add_task_button {
  width: 100%;
  border: 2px solid $gray-700;
  border-radius: 5px;

  background: $white;
  padding: 19px 0 18px 60px;

  text-transform: capitalize;
  text-align: left;
  font-size: $font-size_s;
  color: $gray-500;

  position: relative;

  @include breakpoint($tablet) {
    padding: 19px 0 18px 67px;
    font-size: $font-size_l;
  }

  &::before {
    position: absolute;
    left: 33px;
    content: "\f067";
    font: var(--fa-font-solid); //用font-awesome預設css
    margin-right: 8px;
  }
}
</style>