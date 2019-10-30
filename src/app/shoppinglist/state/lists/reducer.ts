import {createReducer, on} from '@ngrx/store';

import * as ListActions from './actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {List} from '../../model/list';
import {StoreDto} from '../../../core/core/model/dto';

export interface ListState extends EntityState<StoreDto<List>> {
  selectedListId: string;
}

const listAdapter = createEntityAdapter<StoreDto<List>>();


export const reducer = createReducer(
  listAdapter.getInitialState({
    selectedListId: null
  }),
  on(ListActions.readList, (state, data) => {
    state = listAdapter.removeAll(state);
    return listAdapter.addMany(data.lists.map(x => {
      return {id: x.id, item: x, isLoading: false, hasError: false};
    }), state);
  }),
  on(ListActions.loadList, (state, data) => (listAdapter.updateOne({id: data.id, changes: {isLoading: true}}, state))),
  on(ListActions.loadListSuccess, (state, data) => (listAdapter.updateOne({id: data.id, changes: {isLoading: false}}, state))),
  on(ListActions.selectList, (state, data) => ({...state, selectedListId: data.id})),
);


