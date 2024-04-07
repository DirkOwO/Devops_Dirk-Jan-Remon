<script>
import { ref } from "vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const fact = ref("empty");
    const inputValue = ref('');

    const getData = async () => {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();
        fact.value = result;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const postData = async () => {
      try {
        const response = await fetch("/api/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: inputValue.value })
        });
        const result = await response.json();
        console.log("POST request result:", result);
        await getData(); 
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    };

    getData(); // Call getData when the component is mounted

    return {
      fact,
      inputValue,
      postData
    };
  }
}
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="fact !== 'empty'">{{ fact }}</p>
    <input v-model="inputValue" type="text" placeholder="Enter text to send">
    <button @click="postData">Send</button>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  position: relative;
  background-color: #528773;
  border: none;
  font-size: 28px;
  color: #FFFFFF;
  padding: 10px;
  margin: 10px;
  width: 100px;
  text-align: center;
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

button:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
</style>
