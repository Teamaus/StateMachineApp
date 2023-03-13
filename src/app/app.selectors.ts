import { createFeatureSelector, createSelector } from "@ngrx/store";

export const ProfileIDSelector = createSelector(
    createFeatureSelector("profile"),
    (state:any)=>state?state.activeID?state.activeID.profileID:state.activeID:state
    
)