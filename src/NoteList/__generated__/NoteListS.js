

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NoteListS
// ====================================================

export type NoteListS_Note_previousValues = {
  id: string
};

export type NoteListS_Note_node = {
  id: string,
  detail: ?string,
};

export type NoteListS_Note = {
  mutation: _ModelMutationType,
  previousValues: ?NoteListS_Note_previousValues,
  updatedFields: ?Array<string>,
  node: ?NoteListS_Note_node,
};

export type NoteListS = {
  Note: ?NoteListS_Note
};

//==============================================================
// START Enums and Input Objects
// All enums and input objects are included in every output file
// for now, but this will be changed soon.
// TODO: Link to issue to fix this.
//==============================================================

// null
export type _ModelMutationType = "CREATED" | "DELETED" | "UPDATED";

//==============================================================
// END Enums and Input Objects
//==============================================================