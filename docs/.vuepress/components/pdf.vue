<template>
  <div>
    {{ currentPage }} / {{ pageCount }}
    <pdf
        src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
    ></pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  name: "pdf",
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
    }
  },
  methods: {}
}
</script>

<style scoped>
https://github.com/FranckFreiburger/vue-pdf#readme
</style>