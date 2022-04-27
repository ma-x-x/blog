<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <svg-icon color="#333" icon-class="dict" />
        <span style="margin: 0 5px">字典列表</span>
      </template>
      <!-- 字典项组件 -->
      <dict-item />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue';
import DictItem from './components/DictItem.vue';
</script>
