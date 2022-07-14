const cds = require("@sap/cds")

describe('People Service Int Test', () => {

  /**
   * @type {{axios:import("axios").AxiosInstance}}
   */
  const { axios } = cds.test(".").in(__dirname, "..")

  axios.defaults.validateStatus = () => true
  // if you enabled the basic auth for local development
  // axios.defaults.auth = { username: "user", password: 'pass' }

  const testPeopleID = cds.utils.uuid();

  it('should read metadata', async () => {
    const response = await axios.get("/people/$metadata")
    expect(response.data).toMatch(/EarthPeople/)
  });

  it('should support validate the length of Name', async () => {
    const response = await axios.post("/people/EarthPeoples", { "Name": "theo" })
    expect(response.status).toBe(500)
    expect(response.data.error.message).toBe("invalid name")
  });

  it('should support create a valid EarthPeople instance', async () => {
    const response = await axios.post("/people/EarthPeoples", {
      "ID": testPeopleID,
      "Name": "theo valid"
    })
    expect(response.status).toBe(201)
    expect(response.data).toMatchObject({
      "@odata.context": "$metadata#EarthPeoples/$entity",
      ID: testPeopleID,
      Name: "theo valid",
      Age: 18,
      Weight: null,
      Address: null,
    })
  });

  it('should support update the Age of people', async () => {
    const response = await axios.patch(`/people/EarthPeoples(${testPeopleID})`, { Age: 99 })
    expect(response.status).toBe(200)
    expect(response.data).toMatchObject({
      ID: testPeopleID,
      Age: 99
    })
  });

  it('should support soft delete for EarthPeople', async () => {
    const response = await axios.delete(`/people/EarthPeoples(${testPeopleID})`)
    expect(response.status).toBe(204)
  });

});
