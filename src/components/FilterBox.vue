<template>
	<div @click="fire" :class="filter + ' filter-item'" :style="`background-image:url(${image})`">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'filterbox',
		props : {
			image : String,
			filter: String
		},
		methods: {
			fire() {
				this.emitter.emit('filtername', this.filter) //mitt 라이브러리
			}
		}
	}
</script>
<style>
	.filter-item {
		width: 100px;
		height: 100px;
		margin: 10px 10px 10px auto;
		padding: 8px;
		display: inline-block;
		color : white;
		background-size: cover;
		background-position : center;
	}
	.filter-item span {
		background: black;
		padding: 1px 5px;
	}
</style>