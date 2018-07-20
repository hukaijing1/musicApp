import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    this.changeHeight(this.playlist)
  },
  activated () {
    this.changeHeight(this.playlist)
  },
  watch: {
    playlist (newVal) {
      this.changeHeight(newVal)
    }
  },
  methods: {
    changeHeight () {
      throw new Error('component must implement chaneHeight method')
    }
  }
}