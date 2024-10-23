export type analyticUserType = {
  lastSevenDays: Array<string>;
  createdClassesThisDay: Array<{
    id: string;
    name: string;
    creationDate: string;
  }>;
  createdClassesInTheLastSevenDays: Array<{
    id: string;
    name: string;
    creationDate: string;
  }>;
  createdClassesActivityThisDay: number;
  createdClassesActivityInTheLastSevenDays: Array<number>;
  requestsToChatThisDay: Array<{
    id: string;
    message: string;
    creationDate: string;
  }>;
  requestsToChatInTheLastSevenDays: Array<{
    id: string;
    message: string;
    creationDate: string;
  }>;
  requestsToChatActivityThisDay: number;
  requestsToChatActivityInTheLastSevenDays: Array<number>;
  generatedContentThisDay: Array<any>;
  generatedContentInTheLastSevenDays: Array<any>;
  generatedContentActivityThisDay: number;
  generatedContentActivityInTheLastSevenDays: Array<number>;
};

export interface CreatedClassesThisDay {
  id: string;
  name: string;
  creationDate: string;
}

export interface CreatedClassesInTheLastSevenDay {
  id: string;
  name: string;
  creationDate: string;
}

export interface RequestsThisDay {
  id: string;
  message: string;
  creationDate: string;
}

export interface RequestsInTheLastSevenDay {
  id: string;
  message: string;
  creationDate: string;
}
