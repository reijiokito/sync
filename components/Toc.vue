<script lang="ts" setup>

</script>

<template>
  <div>
    <div>
      <slot name="title">
        Table of Contents
      </slot>
    </div>
    <slot>add <code>TocLinks</code> </slot>
  </div>
</template>
