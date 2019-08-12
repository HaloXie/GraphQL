const { RESTDataSource } = require('apollo-datasource-rest');
const { paginateResults } = require('../utils')


class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // function 
  async getAllLaunches() {
    const response = await this.get('launches')
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : []
  }

  async launchesWithPaging({ pageSize, after }) {
    const allLaunches = await this.getAllLaunches();
    // we want these in reverse chronological order
    allLaunches.reverse();
    const launches = paginateResults({
      after,
      pageSize,
      results: allLaunches
    });
    return {
      launches,
      cursor: launches.length ? launches[launches.length - 1].cursor : null,
      // if the cursor of the end of the paginated results is the same as the
      // last item in _all_ results, then there are no more results after this
      hasMore: launches.length
        ? launches[launches.length - 1].cursor !== allLaunches[allLaunches.length - 1].cursor
        : false
    };
  }

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }

  //
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

}

module.exports = LaunchAPI;