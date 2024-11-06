<template>
  <div class="not-found-container">
    <div class="icon">
      <img src="https://i.pinimg.com/564x/9d/d8/87/9dd887a7e692c875363e8291304b2f2a.jpg" alt="not found img">
    </div>
    <h2>Product not found</h2>
    <p>We cannot find what you're looking for. Try to use other keywords or reset the keyword.</p>
    <router-link to="/">
      <button>Back to Home</button>
    </router-link>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top:40px;
  color: #333;
}

.icon {
  margin-bottom: 20px;
}

.icon img {
  width: 280px;
  height: 280px;
  border-radius: 10px;
  object-fit: cover;
  fill: #1abbbd;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: palevioletred;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  max-width: 300px;
}

button {
  background-color: palevioletred;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: palevioletred;
}
</style>
