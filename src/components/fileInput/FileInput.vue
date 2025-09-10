<template>

  <input type="file" @change="onChangeFile" name="file" />

</template>

<script>
    const onChangeFile = (event) => {
      this.$emit('update:modelValue', event.target.files[0])
    }
</script>