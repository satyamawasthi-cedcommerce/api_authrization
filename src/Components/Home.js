import React, { useEffect, useState, useCallback } from "react";
import { Text, Card, DataTable, Pagination, TextField} from "@shopify/polaris";
import { Spinner } from "@shopify/polaris";
import { Select, Button } from "@shopify/polaris";
function Home() {
  const [userData, setUserData] = useState([]);
  const [load, setLoad] = useState(true);
  const [pageCount, setpageCount] = useState(1);
  const [selected, setSelected] = useState("10");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];
  const optionTemp =[
    {label :"Equals" , value :"equals"}
  ]
  useEffect(() => {
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${pageCount}&count=${selected}`,
      {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((item) => {
        let tempUsers = [];
        item.data.rows.forEach((item, index) => {
          tempUsers.push([
            item.user_id,
            item.catalog,
            item.username,
            item.email,
            item.shopify_plan,
            item.updated_at,
            item.updated_at,
          ]);
        });
        tempUsers.unshift([
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />,
          <Select value="Equals" options={optionTemp} />

        ])
        tempUsers.unshift([
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
          <TextField autoComplete="off" />,
        ]);
        setUserData(tempUsers);
        setLoad(false);
      });
  }, [pageCount, selected]);

  console.log(userData);

  return (
    <>
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
                rows={userData}
                hasZebraStripingOnData
              />

              {/* </DataTable> */}
            </Card>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
