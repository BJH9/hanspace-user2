import { Helmet } from "react-helmet-async";
// @mui
import { Box, Card, Container, CardHeader, CardContent } from "@mui/material";

// components
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
// sections
import { ReactHookForm } from "../../../sections/_examples/extra/form";

// ----------------------------------------------------------------------

export default function Form() {
  return (
    <>
      <Helmet>
        <title> Extra Components: Form Validation | Minimal UI</title>
      </Helmet>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "grey.200" : "grey.800",
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Form Validation"
            links={[
              { name: "Components", href: PATH_PAGE.components },
              { name: "Form Validation" },
            ]}
            moreLink={[
              "https://react-hook-form.com/",
              "https://github.com/jquense/yup",
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="React Hook Form" />
          <CardContent>
            <ReactHookForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
