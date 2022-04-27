<template>
  <template v-if="!item.children || item.children.length === 0">
    <app-link v-if="item" :to="item.path">
      <el-menu-item :index="item.path" :class="{ 'submenu-title-noDropdown': !isNest }">
        <svg-icon v-if="item && item.icon" :icon-class="item.icon" />
        <template #title>
          {{ generateTitle(item.name) }}
        </template>
      </el-menu-item>
    </app-link>
  </template>
  <el-sub-menu v-else :index="item.path" popper-append-to-body>
    <template #title>
      <svg-icon v-if="item && item.icon" :icon-class="item.icon"></svg-icon>
      <span v-if="item && item.name">{{ generateTitle(item.name) }}</span>
    </template>

    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :is-nest="true"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
import path from 'path-browserify';
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';

import { generateTitle } from '@/utils/i18n';
import SvgIcon from '@/components/SvgIcon/index.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    required: false,
  },
  basePath: {
    type: String,
    required: true,
  },
});

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}
</script>

<style lang="scss" scoped></style>
