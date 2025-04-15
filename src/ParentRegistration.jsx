
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ParentRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: "",
    parentGender: "",
    parentEmailId: "",
    parentPw: "",
    confirmPw: "",
    contactNumber: "",
    children: [{ childName: "", childGender: "", childAge: "", dateOfBirth: "" }],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const isMismatch = formData.parentPw && formData.confirmPw && formData.parentPw !== formData.confirmPw;

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.children];
    updatedChildren[index][name] = value;
    setFormData((prev) => ({ ...prev, children: updatedChildren }));
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { childName: "", childGender: "", childAge: "", dateOfBirth: "" }],
    }));
  };

  const removeChild = (index) => {
    const updated = formData.children.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, children: updated }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.parentName) newErrors.parentName = "Required";
    if (!formData.parentGender) newErrors.parentGender = "Required";
    if (!formData.parentEmailId) newErrors.parentEmailId = "Required";
    if (!formData.parentPw) newErrors.parentPw = "Required";
    if (!formData.confirmPw) newErrors.confirmPw = "Required";
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Must be 10 digits";
    }

    formData.children.forEach((child, index) => {
      if (!child.childName || !child.childGender || !child.childAge || !child.dateOfBirth) {
        newErrors[`child-${index}`] = "All child fields are required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    if (isMismatch) {
      toast.error("Passwords do not match!");
      return;
    }

    const emailExists = registeredUsers.some(user => user.parentEmailId === formData.parentEmailId);
    const contactExists = registeredUsers.some(user => user.contactNumber === formData.contactNumber);

    if (emailExists && contactExists) {
      toast.error("Both email and contact number already exist.");
      return;
    } else if (emailExists) {
      toast.error("Email already exists.");
      return;
    } else if (contactExists) {
      toast.error("Contact number already exists.");
      return;
    }

    setRegisteredUsers((prev) => [...prev, formData]);
    toast.success("Registration successful!");

    setTimeout(() => navigate("/"), 2000); // Redirect after 2s

    setFormData({
      parentName: "",
      parentGender: "",
      parentEmailId: "",
      parentPw: "",
      confirmPw: "",
      contactNumber: "",
      children: [{ childName: "", childGender: "", childAge: "", dateOfBirth: "" }],
    });
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-gradient">
      <div className="card w-100 mx-3" style={{ maxWidth: "500px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", borderRadius: "20px", backgroundColor: "#ffffff" }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <h5 className="text-secondary mb-3">Parent Information</h5>
            <input name="parentName" value={formData.parentName} onChange={handleParentChange} placeholder="Parent Name" className={`form-control mb-3 ${errors.parentName && "is-invalid"}`} style={{ borderRadius: "15px" }} />
            <select name="parentGender" value={formData.parentGender} onChange={handleParentChange} className={`form-control mb-3 ${errors.parentGender && "is-invalid"}`} style={{ borderRadius: "15px" }}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input name="parentEmailId" type="email" value={formData.parentEmailId} onChange={handleParentChange} placeholder="Email" className={`form-control mb-3 ${errors.parentEmailId && "is-invalid"}`} style={{ borderRadius: "15px" }} />

            <div className="position-relative mb-3">
              <input name="parentPw" type={showPassword ? "text" : "password"} value={formData.parentPw} onChange={handleParentChange} placeholder="Password" className={`form-control ${isMismatch || errors.parentPw ? "border-danger" : ""}`} style={{ borderRadius: "15px" }} />
              <span className="position-absolute top-50 end-0 translate-middle-y pe-3" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="position-relative mb-3">
              <input name="confirmPw" type={showConfirmPw ? "text" : "password"} value={formData.confirmPw} onChange={handleParentChange} placeholder="Confirm Password" className={`form-control ${isMismatch || errors.confirmPw ? "border-danger" : ""}`} style={{ borderRadius: "15px" }} />
              <span className="position-absolute top-50 end-0 translate-middle-y pe-3" onClick={() => setShowConfirmPw(!showConfirmPw)} style={{ cursor: "pointer" }}>
                {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {isMismatch && <small className="text-danger ps-1">Passwords do not match</small>}
            </div>

            <input name="contactNumber" value={formData.contactNumber} onChange={handleParentChange} placeholder="Contact Number" className={`form-control mb-3 ${errors.contactNumber && "is-invalid"}`} style={{ borderRadius: "15px" }} />

            <h5 className="text-secondary mb-3">Children Information</h5>
            {formData.children.map((child, index) => (
              <div className="border p-4 mb-3 bg-light rounded" key={index} style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)" }}>
                <input name="childName" value={child.childName} onChange={(e) => handleChildChange(index, e)} placeholder="Child Name" className="form-control mb-3" style={{ borderRadius: "15px" }} />
                <select name="childGender" value={child.childGender} onChange={(e) => handleChildChange(index, e)} className="form-control mb-3" style={{ borderRadius: "15px" }}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input name="childAge" type="number" value={child.childAge} onChange={(e) => handleChildChange(index, e)} placeholder="Age" className="form-control mb-3" style={{ borderRadius: "15px" }} />
                <input name="dateOfBirth" type="date" value={child.dateOfBirth} onChange={(e) => handleChildChange(index, e)} className="form-control mb-3" style={{ borderRadius: "15px" }} />
                {formData.children.length > 1 && (
                  <button className="btn btn-danger btn-sm mt-2" type="button" onClick={() => removeChild(index)} style={{ borderRadius: "10px" }}>
                    Remove Child
                  </button>
                )}
                {errors[`child-${index}`] && <div className="text-danger">{errors[`child-${index}`]}</div>}
              </div>
            ))}
            <button className="btn btn-primary btn-sm mb-3" type="button" onClick={addChild} style={{ borderRadius: "15px", backgroundColor: "#add8e6" }}>
              Add Child
            </button>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary mb-3" style={{ borderRadius: "15px", backgroundColor: "#add8e6" }}>
                Register
              </button>
            </div>
          </form>
          <p className="text-center">
            Already registered? <Link to="/">Login here</Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ParentRegistration;
