export enum FlatListItemType {
  Experience = 'experience',
  MyExperience = 'myexperience',
  HorizontalCategoriesList = 'horizontalCategoriesList',
  HorizontalFiltersList = 'horizontalFiltersList',
}

export type FlatListItemRequiredProps = {
  itemType: FlatListItemType
}
