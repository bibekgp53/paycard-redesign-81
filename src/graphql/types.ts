// If this file already exists, keep the existing types and add this interface if not present

export interface GetProfilesData {
  profilesCollection: {
    edges: Array<{
      node: {
        id: string;
        profile_number: string;
        name: string | null;
        business_name: string | null;
      }
    }>
  }
}
