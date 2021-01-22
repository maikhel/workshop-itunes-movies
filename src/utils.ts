import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';

export type PayloadActionFromCreator<AC> = AC extends ActionCreatorWithPayload<
  infer P
>
  ? PayloadAction<P>
  : unknown;
