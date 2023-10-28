<script setup>
import { ref, computed } from 'vue'
import MyTasks from '@/views/MyTasks.vue'
import InProgress from '@/views/InProgress.vue'
import Completed from '@/views/Completed.vue'
import NotFound from '@/views/NotFound.vue'

const routes = {
  '/': MyTasks,
  '/inProgress': InProgress,
  '/completed': Completed,
}

const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const myTasks = computed(()=>currentPath.value==="#/"||currentPath.value==="");
const inProgress = computed(()=>currentPath.value==="#/inProgress");
const completed = computed(()=>currentPath.value==="#/completed");


const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})


</script>
<template>
   <header>
    <nav class="header_nav">
      <ul class="header_task_category">
        <li data-name="myTasks" :class="{ active:myTasks }"><a href="#/">my tasks</a></li>
        <li data-name="inProgress" :class="{ active:inProgress }"><a href="#/inProgress">in progress</a></li>
        <li data-name="completed" :class="{ active:completed }"><a href="#/completed">completed</a></li>  
      </ul>
    </nav>
  </header>
    <component :is="currentView" />
</template>

<style lang="scss" scoped>
header {
  background-color: $primary-blue;
  .header_nav{
    max-width: 620px;
    margin: 0 auto;
  }
}
.header_nav {
  ul {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  // 沒在某頁的按鈕

  li {
    width: 160px;
    text-transform: capitalize;
    padding: 24px 0;
    text-align: center;

    @include breakpoint($tablet) {
      font-size: $font-size_l;
    }
    & a{
      color: $secondary-blue;
    }
  }

  .active {
    border-bottom: 5px solid #00408b;
    & a{
      color: $white;
    }
  }
}


</style>