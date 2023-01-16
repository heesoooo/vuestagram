import { isStaticProperty } from '@vue/compiler-core';
import axios from 'axios';
import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			name: 'kim',
			age: 20,
			likes: 30,
			likesCLick: false,
			more: {},
		};
	},

	mutations: {
		// nameChange(state) {
		// 	state.name = 'park';
		// },
		// increment(state, payload) {
		// 	state.age += payload;
		// },

		setMore(state, data) {
			//data는 setMore쓸 때 데이터 넣을 수 있음!
			state.more = data;
		},

		likesPlus(state) {
			if (state.likesCLick == false) {
				state.likes++;
				state.likesCLick = true;
			} else {
				state.likes--;
				state.likesCLick = false;
			}
		},
	},

	// ajax하는 곳 or 오래걸리는 작업들
	actions: {
		getData(context) {
			axios.get('https://codingapple1.github.io/vue/more0.json').then(a => {
				console.log(a.data);
				context.commit('setMore', a.data);
			});
		},
	},
});

export default store;
