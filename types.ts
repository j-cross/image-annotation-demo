export interface Study {
  study_id: string,
  ia_demo: string,
  patient_id: string,
  frames: Frame[]
}

export interface Frame {
  id: string,
  layerId: string,
  state_history: {state:string,timestamp:number}[]
  url: string
}