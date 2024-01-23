<script lang="ts" setup>

</script>

<template>
  <div class="container mx-auto">

    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
