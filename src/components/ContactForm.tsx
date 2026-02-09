"use client";

import React, { useState } from "react";
import { submitContactForm } from "@/lib/api";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await submitContactForm(formData);
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <form className="premium-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Subject</label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Type"
                />
            </div>
            <div className="form-group">
                <label>Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                ></textarea>
            </div>
            <button type="submit" className="cta-button" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && <p className="status-msg success">Message sent successfully!</p>}
            {status === "error" && <p className="status-msg error">Failed to send message. Please try again.</p>}
        </form>
    );
};

export default ContactForm;
