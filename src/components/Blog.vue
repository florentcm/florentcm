<template>
  <div v-if="feed">
    <img :src="feed.image.url" :alt="feed.image.description">
    <h2>{{ feed.description }}</h2>
    <ul>
      <li v-for="item in feed.items" :key="item.link">
        <a :href="item.link">{{ item.title }}</a>
        <br><span class="date">{{ item.isoDate | date('YYYY/MM/DD hh:mm') }}</span>
      </li>
    </ul>
    <a :href="feed.link">See all on Medium</a>
  </div>
</template>

<script>
import moment from 'moment';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
let Parser = require("rss-parser");
let parser = new Parser();

export default {
  data() {
    return {
      isLoading: false,
      feedUrl: "https://medium.com/feed/@florentcm",
      feed: false
    };
  },

  filters: {
    date: function(str, format = 'MM/DD/YYYY hh:mm'){
      return moment(String(str)).format(format);
    }
  },

  methods: {
    fetchFeed() {
      this.isLoading = true;
      let context = this;
      parser.parseURL(CORS_PROXY + this.feedUrl, function(
        err,
        feed
      ) {
        context.feed = feed;
        context.isLoading = false;
      });
    },
    xmlToJson(xml) {
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
      return obj;
    }
  },

  mounted() {
    this.fetchFeed();
  }
};
</script>

<style lang="scss">
img{
  width: 60px;
  height: auto;
  display: inline-block;
  vertical-align: middle;
  margin-right: 30px;
}

h2{
  display: inline-block;
  vertical-align: middle;
}
li{
  list-style-type: square;
  margin: 15px 0;
}
</style>