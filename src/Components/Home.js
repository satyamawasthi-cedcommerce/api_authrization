import React, { useEffect, useState, useCallback } from "react";
import { Text, Card, DataTable, Pagination, TextField } from "@shopify/polaris";
import { Spinner } from "@shopify/polaris";
import { Select, Button } from "@shopify/polaris";
function Home() {
  var optionsFilter = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
  ];
  var [filterValues, setFilterValues] = useState([
    { type: "user_id", val: "1", text: "" },
    { type: "catalog", val: "1", text: "" },
    { type: "username", val: "1", text: "" },
    { type: "email", val: "1", text: "" },
    { type: "shopify_plan", val: "1", text: "" },
    { type: "updated_at", val: "1", text: "" },
    { type: "created_at", val: "1", text: "" },
    { type: "shop_url", val: "1", text: "" },
  ]);
  var selectInput = Array(7)
    .fill(10)
    .map((item, index) => {
      return (
        <>
          <Select
            label="Date range"
            options={optionsFilter}
            onChange={(value) => {
              var temp = filterValues;
              temp[index].val = value;
              setFilterValues([...temp]);
            }}
            value={filterValues[index].val}
          />
          <br />
          <TextField
            value={filterValues[index].text}
            onChange={(value) => {
              var temp = filterValues;
              temp[index].text = value;
              setFilterValues([...temp]);
            }}
          />
        </>
      );
    });

  // userData state var to hold the data fetched throudh api
  const [userData, setUserData] = useState([]);
  // load state holds value for the spinner action while the data gets fetched
  const [load, setLoad] = useState(true);
  // state var for pagination
  const [pageCount, setpageCount] = useState(1);
  // state var for number of rows to be displayed
  const [selected, setSelected] = useState("10");
  const [filter, setFilter] = useState("");
  // this function gets executed when select value is changed (refering to topSelect option)
  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const handleSelectChangetemp = useCallback((value) => setFilter(value), []);
  // options for the top selct component
  const options = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];

  // gets executed as the page loads
  useEffect(() => {
    var str = "";
    filterValues.map((item, index) => {
      if (item.text !== "") {
        str += "&filter[" + item.type + "][" + item.val + "]=" + item.text;
      }
      console.log(str);
    });
    // abort for cancelling all previous requests
    if (window.controller) {
      window.controller.abort();
    }
    window.controller = new AbortController();
    var signal = window.controller.signal;
    // fetching api
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${pageCount}&count=${selected}+${str}`,
      // defining method and headers
      {
        method: "GET",
        // dynamic token being generated each time user logs in
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      // converting the data in array format
      .then((item) => {
        // temp array to hold the items i.e results fetched which later is assigned to state var "userData"
        let tempUsers = [];
        item.data.rows.forEach((item, index) => {
          tempUsers.push([
            item.user_id,
            item.catalog,
            item.username,
            item.email,
            item.shopify_plan,
            item.updated_at,
            item.created_at,
          ]);
        });

        setUserData(tempUsers);
        setLoad(false);
      });
  }, [pageCount, selected, filter, filterValues]);

  console.log(userData);
  return (
    <>
      {/* conditionally rendering the data and load state */}
      {load ? (
        <>
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </>
      ) : (
        <>
          <Text variant="heading3xl" as="h1">
            Data Grid...
          </Text>
          <div
            style={{
              width: "70%",
              marginLeft: "15%",
              marginBottom: "2%",
            }}
          >
            <Card sectioned>
              <div
                style={{
                  width: "70%",
                  marginLeft: "15%",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Pagination
                  label="Results"
                  hasPrevious
                  onPrevious={() => {
                    setpageCount(pageCount - 1);
                    setLoad(true);
                  }}
                  hasNext
                  onNext={() => {
                    setpageCount(pageCount + 1);
                    setLoad(true);
                  }}
                />
                <Select
                  label="Select Page Limit"
                  labelInline
                  options={options}
                  onChange={handleSelectChange}
                  value={selected}
                />
                <Button primary>View Columns</Button>
              </div>
            </Card>
          </div>
          <div style={{ width: "70%", marginLeft: "15%", textAlign: "left" }}>
            <Card sectioned>
              <DataTable
                columnContentTypes={[
                  "text",
                  "numeric",
                  "numeric",
                  "numeric",
                  "numeric",
                ]}
                headings={[
                  "UserId",
                  "Catalog",
                  "Shop Domain",
                  "Shop email",
                  "Shop Plan name",
                  "Updated at",
                  "Created at",
                ]}
                rows={[selectInput, ...userData]}
                hasZebraStripingOnData
              />
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
