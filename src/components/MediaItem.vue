<template>
  <div>
    <h3>{{ media.title }}</h3>
    <p>{{ media.type }} - {{ media.status }}</p>
  </div>
</template>

<script>
export default {
  props: {
    media: Object
  }
};
</script>
