import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaUpload, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { 
  useCreateProductMutation,
  useUploadProductImageMutation 
} from '../../slices/productsApiSlice';

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      await createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
      }).unwrap();
      
      toast.success('Product created successfully');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Image uploaded successfully');
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeImageHandler = () => {
    setImage('');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card className="p-4">
            <Link to="/admin/productlist" className="btn btn-light mb-4">
              Go Back to Products
            </Link>
            
            <FormContainer>
              <h1 className="text-center mb-4">Create New Product</h1>
              
              {loadingCreate && <Loader />}
              
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="image" className="mb-3">
                      <Form.Label>Product Image</Form.Label>
                      {image ? (
                        <div className="position-relative mb-3">
                          <img 
                            src={image} 
                            alt="Preview" 
                            className="img-fluid rounded"
                            style={{ maxHeight: '200px' }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-1"
                            onClick={removeImageHandler}
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      ) : (
                        <div className="border rounded p-4 text-center">
                          <p className="text-muted">No image selected</p>
                        </div>
                      )}
                      
                      <div className="d-flex align-items-center mt-2">
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={uploadFileHandler}
                          className="d-none"
                          id="image-upload"
                        />
                        <Button
                          as="label"
                          htmlFor="image-upload"
                          variant="outline-secondary"
                          className="me-2"
                        >
                          <FaUpload className="me-1" /> Upload Image
                        </Button>
                        {loadingUpload && <Loader small />}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="category" className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="countInStock" className="mb-3">
                      <Form.Label>Stock Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Enter quantity in stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="description" className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter detailed product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={loadingCreate || loadingUpload || !image}
                  >
                    {loadingCreate ? 'Creating...' : 'Create Product'}
                  </Button>
                </div>
              </Form>
            </FormContainer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCreatePage;