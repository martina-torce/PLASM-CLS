import { db } from "../../db";
import {
  getDocs, getDoc, doc, addDoc,
  query, where, limit, startAfter, startAt,
  collection,
  Timestamp
} from "firebase/firestore";
import slugify from "slugify";

const initPagination = () => ({
  itemCount: 3,
  lastItem: null,
  paginationHistory: [],
  isFetchingData: false
})

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      item: {},
      pagination: initPagination()
    }
  },
  getters: {
    currentPage(state) {
      if (!state.pagination.paginationHistory) { return 1; }

      return state.pagination.paginationHistory.length;
    },
    filterProjects: state => searchedTitle => {
      const { items } = state;

      if (!searchedTitle) { return items; }

      const filteredProjects = items.filter(item => {
        return item.title &&
          item.title.toLowerCase().includes(searchedTitle.toLowerCase())
      });

      return filteredProjects;
    }
  },
  actions: {
    // context -> state, commit
    async getProjectBySlug({commit}, slug) {
      commit("setProject", {});
      const docQuery = query(
        collection(db, "projects"),
        where("slug", "==", slug)
      );

      const querySnap = await getDocs(docQuery);
      const exchange = querySnap.docs[0].data();
      exchange.id = querySnap.docs[0].id;

      const userSnap = await getDoc(project.authUser);
      project.authUser = userSnap.data();
      project.authUser.id = userSnap.id;
      commit("setExchange", exchange);
    },
    async getMoreExchanges({commit, state}, {page}) {
      let queryData;

      if (state.pagination.isFetchingData) { return; }
      commit("setIsFetchingData", true);

      if (page === "next") {
        queryData = query(
          collection(db, "projects"),
          startAfter(state.pagination.lastItem),
          limit(state.pagination.itemCount)
        )
      } else {
        const lastItemIndex = state.pagination.paginationHistory.length - 1;
        const previousItem = state.pagination.paginationHistory[lastItemIndex - 1];

        if (!previousItem) {
          commit("setIsFetchingData", false);
          return;
        }

        state.pagination.paginationHistory.splice(lastItemIndex, 1);
        queryData = query(
          collection(db, "projects"),
          startAt(previousItem),
          limit(state.pagination.itemCount)
        )
      }

      const snapshot = await getDocs(queryData);
      commit("setIsFetchingData", false);
      if (snapshot.docs.length === 0) { return; }

      const projects = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      commit("setProjects", projects);
      commit("setLastItem", snapshot.docs[snapshot.docs.length - 1]);

      if (page === "next") {
        commit("setPaginationHistory", snapshot.docs[0]);
      }
    },
    async getProjects({commit, state}) {
      commit("resetPagination");

      const projectQuery = query(
        collection(db, "projects"),
        limit(state.pagination.itemCount)
      );
      const snapshot = await getDocs(projectQuery);
      const projects = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

      commit("setProjects", projects);
      commit("setLastItem", snapshot.docs[snapshot.docs.length - 1]);
      commit("setPaginationHistory", snapshot.docs[0]);
    },
    async createProject({rootState, dispatch}, { data, onSuccess }) {
      const userRef = doc(db, "users", rootState.user.data.id);
      data.user = userRef;
      data.slug = slugify(`${data.title} ${Date.now()}`, {
        lower: true,
        strict: true
      })
      data.createdAt = Timestamp.fromDate(new Date());

      await addDoc(collection(db, "projects"), data);

      dispatch("toast/success", "Project was created succesfuly!", {root: true});
      onSuccess();
    }
  },
  mutations: {
    setProjects(state, projects) {
      state.items = projects;
    },
    setProject(state, project) {
      state.item = project;
    },
    setLastItem(state, item) {
      state.pagination.lastItem = item;
    },
    setPaginationHistory(state, item) {
      state.pagination.paginationHistory.push(item);
    },
    setIsFetchingData(state, isFetching) {
      state.pagination.isFetchingData = isFetching;
    },
    resetPagination(state) {
      state.pagination = initPagination();
    }
  }
}
