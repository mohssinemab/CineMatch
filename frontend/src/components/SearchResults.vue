<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="4" v-for="result in filteredResults" :key="result.id">
                    <router-link :to="`/movie/${result.id}`">
                        <v-card class="elevation-2 mb-4 item" @click="logId(result.id)">
                            <v-img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" aspect-ratio="1">
                            </v-img>
                            <v-card-title class="text-center font-weight-bold pa-4">{{ result.title }}</v-card-title>
                        </v-card>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredResults() {
      return this.results.filter(result => result && result.poster_path);
    }
  },
  methods: {
    logId(id) {
      console.log(id);
    }
  }
};
</script>